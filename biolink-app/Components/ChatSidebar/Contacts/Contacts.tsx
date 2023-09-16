import Contact from "./Contact"

export const Contacts = () => {
  return (
    <div className="mt-5 flex flex-col gap-4">
        <h1 className="text-tertiary tracking-wider font-medium px-5">Contacts</h1>
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
    </div>
  )
}
