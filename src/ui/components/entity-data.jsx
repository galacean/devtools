import { Form, Switch, InputNumber, Tag } from 'antd';
import { useContext } from '../context';

function FormItem({ name, children, uiOnly, ...restProps }) {
  const props = { ...restProps, label: name, style: { marginBottom: 0 } };
  if (!uiOnly) {
    props.name = name;
  }
  return <Form.Item {...props}>{children}</Form.Item>;
}

export function EntityData() {
  const { selectedEntity, selectedKeys, handleEntityDataChange } = useContext();
  if (!selectedEntity) return '先从左侧选择一个 Entity';
  const fields = Object.keys(selectedEntity).map((key) => ({
    name: [key],
    value: selectedEntity[key],
  }));
  return (
    <div className="propertyContainer">
      <Form
        fields={fields}
        onFieldsChange={(changedFields) => {
          const key = changedFields[0].name[0];
          const value = changedFields[0].value;
          handleEntityDataChange(key, value);
        }}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 400 }}
      >
        <FormItem name="path" uiOnly>
          {selectedKeys[0]}
        </FormItem>
        <FormItem name="isActive" valuePropName="checked">
          <Switch checkedChildren="👀" unCheckedChildren="🙈" />
        </FormItem>
        <FormItem name="transform.position.x">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.position.y">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.position.z">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.rotation.x">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.rotation.y">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.rotation.z">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.scale.x">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.scale.y">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="transform.scale.z">
          <InputNumber size="small" />
        </FormItem>
        <FormItem name="components" uiOnly>
          {selectedEntity.components.map((component) => (
            <Tag key={component.type}>{component.type}</Tag>
          ))}
        </FormItem>
      </Form>
    </div>
  );
}
