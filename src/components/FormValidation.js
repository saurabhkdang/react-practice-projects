import React, { useState } from 'react'

const FormValidation = () => {
   
    const [form, setForm] = useState({
        email: '',
        pass: '',
        tnc: false
    })
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if(!form.email.trim()){
            newErrors.email = 'Email can not be blank'
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
            newErrors.email = 'Invalid email address'
        }
        if(!form.pass.trim()){
            newErrors.pass = 'Password can not be blank'
        }
        if(!form.tnc){
            newErrors.tnc = "Please accept the T&C"
        }

        return newErrors

    }

    const handleChange = (e) => {
        const {name ,value, type, checked} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        console.log(validationErrors, Object.keys(validationErrors).length)
        if(Object.keys(validationErrors).length === 0) {
            console.log('Form Submitted', form)
            setErrors({})
        } else {
            setErrors(validationErrors)
        }
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="text" className="form-control" id='email' name="email" value={form.email} onChange={handleChange } style={{borderColor:errors.email?"red":""}}/>
                {errors.email && <div style={{color:'red'}}>{errors.email}</div> }
            </div>
            <div className="mb-3">
                <label htmlFor="pass" className="form-label">Password</label>
                <input type="password" className="form-control" id='pass' name="pass" value={form.pass} onChange={handleChange } style={{borderColor:errors.pass?"red":""}}/>
                {errors.pass && <div style={{color:'red'}}>{errors.pass}</div> }
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id='tnc' onChange={handleChange} name="tnc" checked={form.tnc}/>
                <label className="form-check-label" htmlFor="tnc">I accept T&C</label>
                {errors.tnc && <div style={{color:'red'}}>{errors.tnc}</div> }
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default FormValidation