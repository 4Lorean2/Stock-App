import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import useAuthCalls from "../service/useAuthCalls"

const Login = () => {
  const { login } = useAuthCalls()

  const loginSchema = object({
    email: string()
      .email("Voer een geldig e-mailadres in.")
      .required("E-mail is verplicht."),
    password: string()
      .required("Wachtwoord is verplicht.")
      .min(8, "Het wachtwoord moet minstens 8 tekens bevatten.")
      .max(16, "Het wachtwoord moet minstens 16 tekens bevatten.")
      .matches(/\d+/, "Het wachtwoord moet ten minste één cijfer bevatten.")
      .matches(/[a-z]/, "Het wachtwoord moet ten minste één kleine letter bevatten.")
      .matches(/[A-Z]/, "Het wachtwoord moet ten minste één hoofdletter bevatten.")
      .matches(
        /[@$!%*?&]+/,
        "Het wachtwoord moet ten minste één speciaal teken bevatten (@$!%*?&)"
      ),
  })
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values)
              actions.resetForm()
              actions.setSubmitting(false)
            }}
          >
            {({ handleChange, values, touched, errors, handleBlur }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container >
            <img sx={{ width: '150%', maxWidth: '600px', height: 'auto' }} src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
