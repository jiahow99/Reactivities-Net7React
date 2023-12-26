import { useField, useFormikContext } from "formik";

interface Props {
    label: string,
}

const Tags = ({label}: Props) => {
    const { setFieldValue, values } = useFormikContext();
    const [ field ] = useField('category');

    const handleTagClicked = () => setFieldValue('category', label);

    return (
      <span 
        onClick={handleTagClicked} 
        className={`
          py-1 px-2 text-xs text-gray-400 rounded-full tracking-widest font-medium cursor-pointer duration-200
          ${field.value === label ? 'bg-gray-500 text-white' : 'hover:bg-gray-500 hover:text-white'}
        `}>
          { label }
      </span>
    )
}

export default Tags