

import { useAuth } from '../../context/authProvider'
import { Register } from './Register';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export const SignUp = () => {
    const { handleSignUp } = useAuth();

    const initialValues = {
        name: "",
        email: "",
        password: ""
    };

    const signUpSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Email must be a valid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password is too short - should be 4 chars min")
    });
    return (
        <Register>
            <div className="SignUp flex flex--center">
                <div className="SignUp-card card flex flex--column flex--align_center flex--justify_evenly">
                    <h3 className="SignUp-badge badge bg-blue-200">Signup</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpSchema}
                        onSubmit={(values) => {
                            console.log({ values })
                            handleSignUp(values)
                        }}
                    >
                        {(formik) => {
                            const { errors, touched, isValid, dirty } = formik;
                            return (
                                <Form className="SignUp-form flex flex--column flex--justify_around">
                                    <div className="input-container flex flex--column">
                                        <label className="input-label">Name</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter your name"
                                            className={`input ${errors.name && touched.name && "input--error"}`}
                                        />
                                        <ErrorMessage name="name" component="span" className="input-error color-red-300" />
                                    </div>
                                    <div className="input-container flex flex--column">
                                        <label className="input-label">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your Email"
                                            className={`input ${errors.email && touched.email && "input--error"}`}
                                        />
                                        <ErrorMessage name="email" component="span" className="input-error color-red-300" />
                                    </div>
                                    <div className="input-container flex flex--column">
                                        <label className="input-label">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Enter your Password"
                                            className={`input ${errors.password && touched.password && "input--error"}`}
                                        />
                                        <ErrorMessage name="password" component="span" className="input-error color-red-300" />
                                    </div>
                                    <button
                                        type="submit"
                                        className={`SignUp-btn btn btn-secondary btn-round--corner ${!(dirty && isValid) && "disabled-btn"}`}
                                        disabled={!(dirty && isValid)}
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Register>
    );
};
