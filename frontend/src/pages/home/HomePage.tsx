import {useNavigate} from "react-router-dom";
import EntryComponent from "../../components/EntryComponent.tsx";
import SortingComponent from "../../components/SortingComponent.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {BlogEntry} from "../../model/BlogEntryModel.tsx";
import AppHeader from "../../components/AppHeader.tsx";
import styled from "styled-components";
import AddIcon from "../../assets/plus-circle.svg"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0.4em;
  gap: 0.59em;
`;

const NewEntryButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.4em;
  font-size: 1.9em;
  font-weight: 500;
  background-color: #3e608c;
  cursor: pointer;
  transition: border-color 0.25s;
  position: relative;
`;

const AddButtonIcon = styled.img`
  color: #3e608c;
  width: 1.4em;
  position: absolute;
  top: 0.2em;
  left: 1.5em;
`

const BlogList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 1em;
  gap: 1em;
  font-size: 1.1em;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.25em;
  font-weight: 340;
  background-color: rgb(166, 115, 96);
  cursor: text;
  transition: border-color 0.25s;
  position: relative;
  
`;

export default function HomePage() {
    const [entries, setEntries] = useState<BlogEntry[]>([]);
    const navigateTo = useNavigate()
    const fetchEntries = () => {
        axios.get("/api/blogs")
            .then((response) => {
                setEntries(response.data)
            })
            .catch((error) => {
                console.error("Error found", error);
            })
    };
    useEffect(() => {
        fetchEntries();
    }, [])

    function login() {
        const host = window.location.host === 'localhost:5173' ?
            'http://localhost:8080': window.location.origin

        window.open(host + '/oauth2/authorization/github' )
    }

    function whoAmI()
    {
        axios.get("/api/user")
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error found", error);
            })
    }

    return (
        <>
            <AppHeader headerText="MyBlog App"/>
            <Main>
                <p> Login </p>
                <button onClick={login}> Log in</button>
                <button onClick={whoAmI}> Show my user ID</button>


            <NewEntryButton type="button" onClick={() => navigateTo("/newentry")}>
                <AddButtonIcon src={AddIcon} alt="Add Icon"/>New Entry
            </NewEntryButton>
            <SortingComponent entries={entries} setEntries={setEntries}/>
            <BlogList>{entries.map((entry) => {

        return (
            <>
                    <EntryComponent key={entry.id} blogEntry={entry}/>
                </>
        )})
            }
            </BlogList>
            </Main>
        </>
    )
}