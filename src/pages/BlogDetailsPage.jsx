import { Box, Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import blogService from "../services/blog.service";
import Loading from "../components/Loading";

export default function BlogDetailsPage() {
  const [blog, setBlog] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const id = window.location.pathname.split("/")[2];
    blogService.getBlogById(id).then((res) => {
      setBlog(res?.data);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
  }, []);

  return (
    <CssBaseline>
      <Container>
        {
          loading ? (<Loading />
          ) : (<Paper elevation={3} sx={{ margin: "3%", padding: "5%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" component="h2" noWrap>
                  {blog.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="p" component="p" sx={{ color: "grey" }}>
                  {"By " + blog.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "3%",
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "60%",
                      height: "60%",
                      borderRadius: "10px",
                      margin: "0 auto",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ wordWrap: "break-word" }}
                >
                  {blog.content}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          )}
      </Container>
    </CssBaseline>
  );
}
