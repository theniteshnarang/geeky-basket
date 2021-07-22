import { useAuth } from '../../context/authProvider'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Register } from './Register';
export const Login = () => {
    const { handleLogin } = useAuth()

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Email must be a valid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password is too short - should be 4 chars min")
    });

    const initialValues = {
        email: "",
        password: ""
    };

    return (
        <Register>
            <div className="Login flex flex--center">
                <div className="Login-card card flex flex--column flex--align_center flex--justify_evenly">
                    <h3 className="Login-badge badge bg-blue-200">Login</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            handleLogin(values)
                        }}
                    >
                        {
                            (formik) => {
                                const { errors, touched, isValid, dirty } = formik
                                return (
                                    <Form className="Login-form flex flex--column flex--justify_around">
                                        <div className="input-container flex flex--column">
                                            <label className="input-label">Email</label>
                                            <Field
                                                className={`input ${errors.email && touched.email && "input--error"}`}
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter your Email"
                                            />
                                            <ErrorMessage name="email" component="span" className="input-error color-red-300" />
                                        </div>
                                        <div className="input-container flex flex--column">
                                            <label className="input-label">Password</label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                className={`input ${errors.password && touched.password && "input--error"}`}
                                            />
                                            <ErrorMessage name="password" component="span" className="input-error color-red-300" />
                                        </div>
                                        <button
                                            type="submit"
                                            className={`Login-btn btn btn-secondary btn-round--corner ${!(dirty && isValid) && "disabled-btn"}`}
                                            disabled={!(dirty && isValid)}
                                        >
                                            Submit
                                        </button>
                                    </Form>
                                )
                            }

                        }
                    </Formik>
                </div>
            </div>
        </Register>
    );
};
