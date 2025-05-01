import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function FormControls({ formControls = [], formData, setFormData }) {
  function renderComponentByType(getControlItem) {
    const currentValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentValue}
            onChange={(e) =>
              setFormData({ ...formData, [getControlItem.name]: e.target.value })
            }
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          />
        );

      case "select":
        return (
          <Select
            value={currentValue}
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]: value })
            }
          >
            <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              {getControlItem.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentValue}
            onChange={(e) =>
              setFormData({ ...formData, [getControlItem.name]: e.target.value })
            }
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          />
        );

      case "multi-select":
        return (
          <div className="flex flex-col gap-3">
            {getControlItem.options?.map((option) => {
              const isChecked = currentValue.includes(option.id);
              return (
                <div
                  key={option.id}
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    id={`${getControlItem.name}-${option.id}`}
                    name={getControlItem.name}
                    value={option.id}
                    checked={isChecked}
                    onChange={(e) => {
                      const selected = [...currentValue];
                      if (e.target.checked) selected.push(option.id);
                      else selected.splice(selected.indexOf(option.id), 1);

                      setFormData({ ...formData, [getControlItem.name]: selected });
                    }}
                    className="w-5 h-5 text-blue-600 dark:accent-white border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                  <Label
                    htmlFor={`${getControlItem.name}-${option.id}`}
                    className="text-gray-800 dark:text-gray-200 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </div>
        );

      case "group":
        return (
          <div className="flex flex-col gap-4">
            {getControlItem.fields.map((field) => (
              <div key={field.name}>
                <Label htmlFor={field.name} className="text-gray-900 dark:text-gray-200">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={`${getControlItem.name}.${field.name}`}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formData[getControlItem.name]?.[field.name] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: {
                        ...formData[getControlItem.name],
                        [field.name]: e.target.value,
                      },
                    })
                  }
                  className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentValue}
            onChange={(e) =>
              setFormData({ ...formData, [getControlItem.name]: e.target.value })
            }
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          />
        );
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((control) => (
        <div key={control.name}>
          <Label
            htmlFor={control.name}
            className="text-gray-900 dark:text-gray-200"
          >
            {control.label}
          </Label>
          {renderComponentByType(control)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
