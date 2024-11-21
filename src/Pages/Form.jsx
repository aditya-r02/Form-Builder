import React, { useState } from "react";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [showAddFieldMenu, setShowAddFieldMenu] = useState(false);

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: "New Field",
      placeholder: type === "text" ? "Add placeholder text" : undefined,
      options: type === "radio" || type === "checkbox" ? ["Option 1"] : [],
    };
    setFields([...fields, newField]);
    setShowAddFieldMenu(false);
  };

  const deleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex !== index) {
      const updatedFields = [...fields];
      const [movedField] = updatedFields.splice(dragIndex, 1);
      updatedFields.splice(index, 0, movedField);
      setFields(updatedFields);
      setDragIndex(index);
    }
  };

  const handleLabelChange = (index, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
    setFields(updatedFields);
  };

  const handlePlaceholderChange = (index, newPlaceholder) => {
    const updatedFields = [...fields];
    updatedFields[index].placeholder = newPlaceholder;
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, newOptionValue) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = newOptionValue;
    setFields(updatedFields);
  };

  const addOption = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.push(`Option ${updatedFields[fieldIndex].options.length + 1}`);
    setFields(updatedFields);
  };

  const renderField = (field, index) => {
    return (
      <div
        key={field.id}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        className="relative p-4 border rounded-md bg-gray-100 mb-4 cursor-grab"
      >
        <button
          onClick={() => deleteField(index)}
          className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
        >
          Delete
        </button>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Question:
            <input
              type="text"
              value={field.label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
              placeholder="Edit label"
              className="block w-full p-2 mt-1 border rounded-md"
            />
          </label>

          {field.type === "text" && (
            <label className="text-sm font-medium">
              Placeholder:
              <input
                type="text"
                value={field.placeholder}
                onChange={(e) => handlePlaceholderChange(index, e.target.value)}
                placeholder="Add placeholder text"
                className="block w-full p-2 mt-1 border rounded-md"
              />
            </label>
          )}

          {/* {field.type === "text" && (
            <input
              type="text"
              placeholder={field.placeholder}
              className="block w-full p-2 mt-2 border rounded-md"
              disabled
            />
          )} */}

          {(field.type === "radio" || field.type === "checkbox") && (
            <div>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2 mt-2">
                  <input
                    type={field.type}
                    name={`option-${field.id}`}
                    disabled
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    className="p-2 border rounded-md"
                  />
                </div>
              ))}
              <button
                onClick={() => addOption(index)}
                className="mt-2 text-blue-500 hover:underline"
              >
                + Add Option
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Form Builder</h2>
      <div>
        {fields.map((field, index) => renderField(field, index))}
        <button
          onClick={() => setShowAddFieldMenu(!showAddFieldMenu)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          + Add Field
        </button>
        {showAddFieldMenu && (
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => addField("text")}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Text Field
            </button>
            <button
              onClick={() => addField("radio")}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Radio Button
            </button>
            <button
              onClick={() => addField("checkbox")}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Checkbox
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
