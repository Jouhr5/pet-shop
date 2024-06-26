import { useContext, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();
  const [action, setAction] = useState('Login');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { existedUser, setExistedUser } = useContext(LoginContext);

  useEffect(() => {
    axios.get("http://localhost:8002/users")
      .then((response) => {
        setExistedUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAction = () => {
    setAction('Sign up');
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be greater than 6 characters')
      .required('Required'),
    ...(action === 'Sign up' && {
      userName: Yup.string()
        .min(3, 'Share your full name with us')
        .required('Required'),
    })
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (action === 'Sign up') {
        const userExists = existedUser.some((user) => user.email === values.email);

        if (userExists) {
          alert('User already exists');
          navigate("/login");
        } else {
          axios.post("http://localhost:8002/users", values)
            .then((res) => {
              setExistedUser([...existedUser, res.data]);
              console.log('Signed up successfully:', res.data);
              alert('Signed up successfully');
              navigate(-1);
            })
            .catch((err) => {
              console.error('Failed to sign up:', err.message);
              alert('Failed to sign up');
            });
        }
      } else {
        const user = existedUser.find((user) => user.email === values.email);

        if (user) {
          if (user.password === values.password) {
            localStorage.setItem('userData', JSON.stringify(values));
            if(user.id === "123"){
              navigate('/admin')
            }else{
              navigate('/');
            }
          } else {
            alert('Wrong password');
          }
        } else {
          alert('Please sign up');
        }
      }
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {action} to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {action === 'Sign up' && (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                    User Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    autoComplete="current-userName"
                    {...formik.getFieldProps('userName')}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-red-600">{formik.errors.userName}</div>
                ) : null}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...formik.getFieldProps('email')}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps('password')}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {action}
              </button>
            </div>
          </form>

          {action === 'Sign up' ? (
            <button onClick={() => setAction('Login')} className="mt-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Back to login
            </button>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <button onClick={handleAction} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create a new account
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
