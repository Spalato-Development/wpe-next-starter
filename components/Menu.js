import { useGlobalData } from '../lib/context/globalDataContext';

const Menu = (props) => {
  const globalData = useGlobalData();
  const { menuData } = globalData;
  const { menuItems } = menuData?.data?.menu || {};

  console.log('menuData', menuData);
  console.log('menuItems', menuItems);
  return (
    <div>
      <h1>Menu</h1>
      {menuItems?.nodes?.map((item) => (
        <h3>{item.label}</h3>
      ))}
    </div>
  );
};

export default Menu;
