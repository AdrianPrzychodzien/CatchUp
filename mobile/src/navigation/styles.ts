import { styledBoxShadow } from "../styles/global.style";

export const tabBarStyle = {
  position: "absolute" as "absolute",
  bottom: 25,
  left: 20,
  right: 20,
  backgroundColor: "#ffffff",
  borderRadius: 15,
  height: 75,
  ...styledBoxShadow,
};
