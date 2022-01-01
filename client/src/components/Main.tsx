import styled from "styled-components";
import Board from "./Board";
import JoinGame from "./JoinGame";
import Header from "./Header";
import { connect } from "react-redux";
import { StateType } from "../types";
import { useEffect } from "react";
import { socket } from "../connection/socket";
import {
  setRoom,
  createPlayer,
  setActiveTurn,
} from "../redux/Board/board.actions";

const StyledMain = styled.div`
display: flex
flex-wrap: wrap`;

const Main = (props) => {
  useEffect(() => console.log(props.state.boardReducer.roomId.length));
  useEffect(() => {
    socket.on("join-room-server", (roomId) => props.setRoom(roomId));
    socket.on("player-connect", (playerId) => {
      console.log("connect");
      props.createPlayer(playerId);
      props.setActiveTurn(playerId);
    });
  }, []);
  return (
    <StyledMain>
      <Header />
      {props.state.boardReducer.roomId.length === 0 && <JoinGame />}
      {props.state.boardReducer.roomId.length > 0 && (
        <span>Joined game: {props.state.boardReducer.roomId}</span>
      )}
      {props.state.boardReducer.roomId.length > 0 && <Board />}
      {/* <JoinGame />
      <Board /> */}
    </StyledMain>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoom: (roomId: string) => dispatch(setRoom(roomId)),
    createPlayer: (playerId: number) => dispatch(createPlayer(playerId)),
    setActiveTurn: (playerId: number) => dispatch(setActiveTurn(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
