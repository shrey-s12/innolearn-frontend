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
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={currentControlItemValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "multi-select":
        element = (
          <div className="flex flex-col gap-3">
            {getControlItem.options &&
              getControlItem.options.map((optionItem) => (
                <div
                  key={optionItem.id}
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    id={`${getControlItem.name}-${optionItem.id}`}
                    name={getControlItem.name}
                    value={optionItem.id}
                    checked={currentControlItemValue.includes(optionItem.id)}
                    onChange={(e) => {
                      const selectedOptions = [...currentControlItemValue];
                      if (e.target.checked) {
                        selectedOptions.push(optionItem.id);
                      } else {
                        const index = selectedOptions.indexOf(optionItem.id);
                        if (index > -1) selectedOptions.splice(index, 1);
                      }

                      setFormData({
                        ...formData,
                        [getControlItem.name]: selectedOptions,
                      });
                    }}
                    className="w-5 h-5 text-blue-600 border-gray-300"
                  />
                  <Label
                    htmlFor={`${getControlItem.name}-${optionItem.id}`}
                    className="text-gray-800 cursor-pointer"
                  >
                    {optionItem.label}
                  </Label>
                </div>
              ))}
          </div>
        );
        break;
      case "group":
        element = (
          <div className="flex flex-col gap-4">
            {getControlItem.fields.map((field) => (
              <div key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={`${getControlItem.name}.${field.name}`}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formData[getControlItem.name]?.[field.name] || ""}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: {
                        ...formData[getControlItem.name],
                        [field.name]: event.target.value,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        );
        break;
      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controleItem) => (
        <div key={controleItem.name}>
          <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
          {renderComponentByType(controleItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
