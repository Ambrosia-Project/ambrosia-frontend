import FormControl from '@mui/base/FormControl';
import SendIcon from '@mui/icons-material/Send';
import { Alert, Box, Button, FormHelperText, Grid, Input, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import blogService from '../services/blog.service';

const useStyles = makeStyles((theme) => ({
    inputControl: {
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    selectList: {
        minWidth: 120,
        maxHeight: 40,
    },
    content: {
        resize: 'none',
        width: '60%',
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    btn: {
        padding: theme.spacing(1),
        width: '15%',
        alignSelf: 'flex-end',
    },
}));

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export default function CreateBlogPage() {

    const classes = useStyles();
    const action = '/blogs/create';

    const history = useHistory();

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [image, setImage] = React.useState('');
    const [error, setError] = React.useState(false);

    const onImageChange = (event) => {
        const file = event.target.files[0];
        convertToBase64(file).then((res) => {
            console.log(res);
            setImage(res);
        }).catch((err) => {
            console.error(err);
        });

    };

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onTextChange = (event) => {
        setContent(event.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        if (title === '' || content === '' || image === '') {
            setError(true);
            return;
        }

        setError(false);

        const data = {
            email: localStorage.getItem('email'),
            title: title,
            content: content,
            image: image
        };

        try {
            const res = await blogService.create(data);
            console.log(res);
            if (res && res.status === 201) {
                // Item created successfully
                history.push("/blogs", { refresh: true });
            } else {
                throw new Error("Failed to create blog!");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }

    };


    return (
        <form action={action} method='POST' onSubmit={onSubmit} className={classes.form}>
            {
                error &&
                <Alert severity="error" style={{ margin: '10px 10px', width: '40%', }}>
                    Please fill all the fields.
                </Alert>
            }
            <Grid item xs={12}>
                <FormControl required className={classes.inputControl}>
                    <label htmlFor="outlined-select-currency-native">Choose an image</label>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { width: "25%" },
                            marginTop: '5px',
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <Input
                            id="outlined-select-currency"
                            required
                            label="Image"
                            type='file'
                            onChange={onImageChange}
                            inputProps={{
                                accept: ".png, .jpg, .jpeg",
                            }}
                        />

                        <FormHelperText>Required</FormHelperText>
                    </Box>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.inputControl} required>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { width: "100%" }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="title"
                            label="Title"
                            variant="outlined"
                            defaultValue={title}
                            onChange={onTitleChange}
                        />
                        <FormHelperText>Required</FormHelperText>
                    </Box>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.inputControl} required>
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { width: "100%" }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="content"
                            label="Content"
                            multiline
                            required
                            rows={5}
                            variant="outlined"
                            defaultValue={content}
                            onChange={onTextChange}
                        />
                        <FormHelperText>Required</FormHelperText>
                    </Box>
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', textAlign: 'right' }}>
                <Button type="submit" variant="contained" color="success" endIcon={<SendIcon />} className={classes.btn}>Send</Button>
            </Grid>
        </form>
    )
}