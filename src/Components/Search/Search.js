import React, { useState, useEffect } from "react";
import {
    Button,
    CircularProgress,
    Grid,
    TextField,
} from "@mui/material";
import TableResults from './TableResults';

export default function Search(props) {
    const { profileType, fieldObjects, searchUrl, type, onClickFunc } = props;
    const [fields, setFields] = useState([...fieldObjects]);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        setLoading(true);
        const params = Object.fromEntries(fields.map(field => [field.propertyName, field.value]));
        // convert params into an array so we can filter
        const asArray = Object.entries(params);

        //filter the converted params array to remove unnecessary fields
        const notEmpty = asArray.filter(([key, value]) => value !== "");

        // convert back into an object
        const filteredParams = Object.fromEntries(notEmpty);

        fetch(searchUrl, {
            method: "post",
            dataType: "json",
            body: JSON.stringify(filteredParams),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((data) => setSearchResults(data))
            .then(() => setLoading(false));
    };

    const handleChange = (e, setter, index) => {
        setter(prev => {
            return prev.map((f, i) => {
                if (i === index) {
                    f.value = e.target.value;
                }
                return f;
            })
        });
    };

    useEffect(()=>{
        setFields([...fieldObjects]);
    },[fieldObjects])

    return (
        <>
            {fields.map((field, index) => (
                <Grid item xs={12} sm={4} key={`Search-${profileType}-${index}`}>
                    <TextField
                        label={field.label}
                        fullWidth
                        value={field.value}
                        onChange={(e) => handleChange(e, setFields, index)}
                    />
                </Grid>
            ))}
            <Grid container justifyContent="center" item xs={12}>
                <Button variant="contained" onClick={handleSearch} disabled={loading}>
                    {loading ? <CircularProgress /> : "Search"}
                </Button>
            </Grid>
            <Grid container item >
                <TableResults
                    searchResults={searchResults}
                    type={type}
                    onClickFunc={onClickFunc}
                    profileType={profileType}
                    fields={fields}
                    headCells={[...fields,
                    {
                        propertyName: "_id",
                        label: "",
                    },]}
                />
            </Grid>
        </>
    )
}
