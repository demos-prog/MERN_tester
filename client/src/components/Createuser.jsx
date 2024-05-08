import { useState } from "react";

export default function Createuser() {
  const [form, setForm] = useState({
    name: '',
    age: 18,
  })

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newUser = { ...form };
    const res = await fetch('http://localhost:5050/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      console.log('Created');
    } else {
      console.log("Error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col border rounded-lg overflow-hidden p-4">
      <label >
        <input
          className="border"
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
        />
        Name
      </label>
      <label >
        <input
          className="border"
          type="number"
          name="age"
          value={form.age}
          onChange={(e) => updateForm({ age: e.target.value })}
        />
        Age
      </label>
      <input type="submit" value="Create" />
    </form>
  )
}