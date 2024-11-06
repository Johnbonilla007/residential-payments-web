import eventManager from "./utils/eventManager";
import { ACTION } from "./utils/constant";

let container = null;
let queue = [];

const waitControlShow = () => {
  if (container !== null) {
    eventManager.emit(ACTION.SHOW);
  } else {
    queue.push({ action: ACTION.SHOW });
  }
};

const waitControlHide = () => {
  setTimeout(() => {
    eventManager.emit(ACTION.CLEAR);
  }, 0);
};

eventManager
  .on(ACTION.DID_MOUNT, (containerInstance) => {
    container = containerInstance;
    queue.forEach((item) => {
      eventManager.emit(item.action, item.content, item.options);
    });

    queue = [];
  })
  .on(ACTION.WILL_UNMOUNT, () => {
    container = null;
  });

export { waitControlShow, waitControlHide };
