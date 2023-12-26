import { ArrowLeft } from "react-feather"

interface Props {
    setPreview: (preview: string) => void
}

export const BackButton = ({ setPreview }: Props) => {
  return (
    <div className="absolute top-10 left-56">
        <ArrowLeft className="scale-150 cursor-pointer" onClick={() => setPreview('')} />
    </div>
  )
}
