import {BlogEntry} from "../model/BlogEntryModel.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import BookmarkSvg from "../assets/bookmark.svg";

export type props = {
    blogEntry: BlogEntry;
}

const Container = styled.li`
  border: 0.4em #7e5c44 solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 2em;
  position: relative;
  gap: 0.4em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  align-self: center;
  color: #e8a06d
`;

const EntryDate = styled.small`
  align-self: flex-start;
  position: absolute;
  bottom: 1.2em;
  right: 0.6em;
  font-size: 0.8em;
  color: #90d2d8
`;

const BookmarkButton = styled.button`
  width: 3em;
  border-radius: 10px;
  position: absolute;
  top: -1.2em;
  right: 0.2em;
  align-self: end;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const Button = styled.button`
  border-radius: 10px;
  position: relative;
  align-self: end;
  padding: 0;
  background-color: rgb(3, 166, 90);
  border: none;
  cursor: pointer;
  width: 100%;
  height: 3em;
  font-size: 1em;
`;

const TagList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 0.4em;
  list-style: none;
`;

const Tag = styled.li`
  padding: 0.2em;`;


export default function EntryComponent(props: props) {

    const date: string = new Date(props.blogEntry.timeCreated)
        .toLocaleDateString()
    const timeOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit'};
    const time: string = new Date(props.blogEntry.timeCreated).toLocaleTimeString(undefined, timeOptions);
    const navigateTo = useNavigate()

    function handleClickBookmark() {
        console.log("Bookmark was clicked.")
    }

    function handleClickMore() {
        navigateTo("/details/" + props.blogEntry.id)
    }

    function truncateString(str : string, maxLength : number) {
        if (str.length <= maxLength) {
            return str; // Return the original string if it's less than or equal to maxLength
        } else {
            return str.slice(0, maxLength) + "..."; // Truncate and add "..."
        }
    }

    const originalString = props.blogEntry.content;
    const truncatedString = truncateString(originalString, 100);

    return <>
        <Container>
            <Title>{props.blogEntry.title}</Title>
            <p> {props.blogEntry.author} </p>
            <EntryDate>{date + " " + time}</EntryDate>
            <BookmarkButton type="button" onClick={handleClickBookmark}>
                <img src={BookmarkSvg}
                     alt="Bookmark"/>
            </BookmarkButton>
            <p>{truncatedString}</p>
                <Button type="button" onClick={handleClickMore}>Show more
                </Button>
            <TagList>
                {props.blogEntry.hashtags.map(hashtag => {
                        return <Tag>{hashtag}</Tag>
                    }
                )}
            </TagList>
        </Container>
    </>
}