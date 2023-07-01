import {
  Container,
  CssBaseline,
  List,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoData from "../components/NoData";
import blogService from "../services/blog.service";
import BlogListItem from "./BlogListItem";
import CustomSnackbar from "../components/Snackbar";

export default function BlogPage() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogService.fetchData();
      if (!res || res.status !== 200) {
        throw new Error("Failed to get announcements");
      }
      console.log(res);
      setData(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (location.state && location.state.refresh) {
      fetchData();
    }
  }, [fetchData, location.state]);

  return (
    <CssBaseline>
      <Container justifyContent="center">
        {loading ? (
          <Container
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#5E714E",
              fontFamily: "Poppins",
            }}
          >
            <CircularProgress color="inherit" />
          </Container>
        ) : (
          <>
            <List>
              {data.length !== 0 &&
                data.map((blog, index) => {
                  return <BlogListItem key={index} blog={blog} />;
                })}
            </List>
            <>{data.length === 0 && <NoData />}</>
          </>
        )}
      </Container>
    </CssBaseline>
  );
}
