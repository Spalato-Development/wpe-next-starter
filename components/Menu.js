import { useGlobalData } from '../lib/context/globalDataContext';

const Menu = (props) => {
  const globalData = useGlobalData();
  const { menuData } = globalData;
  const { menuItems } = menuData?.data?.menu || {};

  return (
    <div>
      <h1>Menu</h1>
      {menuItems?.nodes?.map((item) => (
        <h3 key={item.label}>{item.label}</h3>
      ))}
    </div>
  );
};

export default Menu;
