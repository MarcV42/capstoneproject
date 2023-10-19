import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NewBlog, Tag} from "./model/model.ts";
import styled from "styled-components";
import AppHeader from "../../components/AppHeader.tsx";
import AddSvg from "../../assets/plus-circle.svg"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.6em;
  gap: 0.6em;
`;

const TitleInput = styled.input`
  font-size: 1.4em;
`;

const ContentTextarea = styled.textarea`
  font-size: 1.2em;
`;

const TagsTitle = styled.span`
  font-size: 1.2em;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

const SingleTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  gap: 0.4em;
`;

const TagLabel = styled.label`
  font-size: 1.2em;
  width: 2em;
  text-align: end;
  align-self: center;
`;

const TagInput = styled.input`
  font-size: 1.2em;
`;

const TagButton = styled.button`
  width: 3em;
  height: 3em;
  font-size: 1em;
  position: relative;
  background: none;
  border: none;
`;

const ButtonImage = styled.img`
width: 2.4em;
  position: absolute;
  top: 0.2em;
  left: 0;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  padding: 0.6em;
  background-color: #90d2d8;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 1.6em;
`;

export default function NewBlogEntry() {

    const [title, setTitle,] = useState("")
    const [text, setText,] = useState("")
    const [tags, setTags,] = useState<Tag[]>([{name: ""}])

    const addNewTag = () => {
        setTags([...tags, {name: ""}]);
    };

    const changeTagName = (index: number, name: string) => {
        const newTags = [...tags];
        newTags[index].name = name;
        setTags(newTags);
    };

    const navigateTo = useNavigate()

    function handleOnSubmit() {
        const filteredTags = tags.filter(tag => tag.name !== "");
        const mytags = filteredTags.map((item) => item.name)

        const newBlogEntry: NewBlog =
            {
                title: title,
                content: text,
                hashtags: mytags,
            };
        axios
            .post("/api/blogs", newBlogEntry)
            .then((response) => {

                console.log("Erfolgreich gespeichert:", response.data);
            })
            .then(() => navigateTo("/"))
            .catch((error) => {
                // Fehler verarbeiten
                console.error("Fehler beim Speichern:", error);
            });
    }


    return <>
        <AppHeader headerText="New Blog"/>
        <Main>
            <TitleInput type="text" placeholder="What I love to eat" value={title}
                        onChange={(event) => setTitle(event.target.value)}></TitleInput>
            <ContentTextarea rows={10} placeholder={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr."}
                             value={text}
                             onChange={(event) => setText(event.target.value)}></ContentTextarea>
            <TagsTitle>Tags:</TagsTitle>
            <TagContainer>
                {tags && tags.map((tag, index) => (
                    <SingleTag key={index}>
                        <TagLabel htmlFor={"tag" + (index + 1)}>{index + 1}. </TagLabel>
                        <TagInput
                            id={"tag" + (index + 1)}
                            value={tag.name}
                            placeholder={"#HashTag"}
                            onChange={(event) => changeTagName(index, event.target.value)}
                        />
                        <TagButton type="button" onClick={() => addNewTag()}>
                            <ButtonImage src={AddSvg} alt="Add Icon"/>
                        </TagButton>
                    </SingleTag>
                ))}
            </TagContainer>
            <SubmitButton onClick={handleOnSubmit}>Submit</SubmitButton>
        </Main>
    </>
}