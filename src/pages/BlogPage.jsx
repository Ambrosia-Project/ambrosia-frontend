import { Container, CssBaseline, List } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import NoData from "../components/NoData";
import blogService from "../services/blog.service";
import BlogListItem from "./BlogListItem";

export default function BlogPage() {

    const [data, setData] = useState([]);
    const location = useLocation();

    const fetchData = useCallback(async () => {
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
            <Container>
                <List>
                    {
                        data.length !== 0 &&
                        data.map((blog, index) => {
                            return (
                                <BlogListItem
                                    key={index}
                                    blog={blog}
                                />
                            );
                        })
                    }
                </List>
                {
                    data.length === 0 && <NoData />
                }
            </Container>
        </CssBaseline>
    );
}