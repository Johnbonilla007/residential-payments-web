/**
 *
 * WaitControl
 *
 */

import React from "react";

import { ACTION } from "../utils/constant";
import eventManager from "../utils/eventManager";
import { StyledWaitControl } from "./styles";
import { WaveSpinner } from "react-spinners-kit";

/* eslint-disable react/prefer-stateless-function */
export class WaitControlContainer extends React.Component {
  state = {
    waitList: [],
  };

  componentDidMount() {
    eventManager
      .on(ACTION.SHOW, () => this.show())
      .on(ACTION.CLEAR, () =>
        this.state.waitList.length > 0 ? this.remove() : this.clear()
      )
      .emit(ACTION.DID_MOUNT, this);
  }

  componentWillUnmount() {
    eventManager.off(ACTION.SHOW).off(ACTION.CLEAR).emit(ACTION.WILL_UNMOUNT);
  }

  isWaitControlOpen = () => this.state.isOpen;

  remove() {
    const { waitList } = this.state;

    waitList.splice(0, 1);

    this.setState({
      waitList,
    });
  }
  dispatchChange() {
    eventManager.emit(ACTION.ON_CHANGE, this.state.toast.length);
  }

  show = () => {
    document.getElementsByTagName("body")[0].style.overflow = "visible";

    const { waitList } = this.state;
    waitList.push(true);
    this.setState({
      waitList,
    });
  };

  isOpen = () => {
    const { waitList } = this.state;

    return waitList.length > 0;
  };

  clear() {
    this.setState({
      isOpen: false,
    });

    document.getElementsByTagName("body")[0].style.overflow = "visible";
  }

  render() {
    return (
      <div style={{ display: this.isOpen() ? "block" : "none" }}>
        <StyledWaitControl>
          <div className="animation-content">
            <WaveSpinner size={70} color="#F2F4F6" loading />
          </div>
        </StyledWaitControl>
      </div>
    );
  }
}

WaitControlContainer.propTypes = {};

export default WaitControlContainer;
