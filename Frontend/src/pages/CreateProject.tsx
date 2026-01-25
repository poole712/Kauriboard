import React, { useState } from "react"
import { createproject } from "../services/authService";
import { useNavigate } from "react-router";

function CreateProject() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    async function handleSubmit() {
        const response = await createproject(title, description);

        if(response.ok) {
            console.log('Project creation successful:', response.data);
            navigate('/pages/Projects');
        } else {
            console.error('Project creation failed:', response.error);
        }
    }


  return (
    <>
      <h1>Create Project</h1>
      <form className="w-50 mx-auto m-5 vh-100">
        <div className="mb-3">
          <label className="form-label float-start" htmlFor="name">
            Project Name
          </label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} id="name" />
        </div>
        <div className="mb-3">
          <label className="form-label float-start" htmlFor="description">
            Description
          </label>
          <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} id="description" />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Create Project
        </button>
      </form>
    </>
  )
}

export default CreateProject
