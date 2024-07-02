import {
  IconCircleHalfVertical,
  IconClock2,
  IconScissors,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import classes from "./Navbar.module.css";

const data = [
  {
    link: "/",
    label: "Split the text",
    icon: IconCircleHalfVertical,
  },
  { link: "/timestamp-removal", label: "Remove timestamps", icon: IconClock2 },
  { link: "/deleting-words", label: "Deleting words", icon: IconScissors },
];

export function Navbar() {
  const links = data.map((item) => (
    <Link key={item.link} to={item.link} className={classes.link}>
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
