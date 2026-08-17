import StaggeredMenu from "./StaggeredMenu";

const menuItems = [
  { label: "Dashboard", ariaLabel: "Go to Dashboard", link: "/dashboard" },
];

const Menu = () => (
  <div style={{ height: "100vh", background: "#1a1a1a" }}>
    <StaggeredMenu
      position="right"
      items={menuItems}
      displaySocials={false}
      displayItemNumbering={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen={true}
      colors={["#B497CF", "#5227FF"]}
      accentColor="#5227FF"
      isFixed
    />
  </div>
);

export default Menu;
