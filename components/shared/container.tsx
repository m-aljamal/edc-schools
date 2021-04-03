import Meta from "./Meta";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: 'Tajawal-Regular' ;
      src: url('/fonts/Tajawal-Regular.ttf');
      
      
  }
  @font-face {
      font-family: 'Tajawal-Medium' ;
      src: url('/fonts/Tajawal-Medium.ttf');
      /* font-weight: normal;
      font-style: normal; */
  }
  @font-face {
      font-family: 'Tajawal-Bold' ;
      src: url('/fonts/Tajawal-Bold.ttf');
      /* font-weight: normal;
      font-style: normal; */
  }
  
  html{
    --slide:rgb(34, 41, 56);
    --blue:rgb(24, 144, 255);
  --darkGray: #606060;
  --red: #ff0000;
  --black: #393939;
  --gray: #3A3A3A;
  --background: #f0f2f5;
  --lightGrey: #e1e1e1;
  --offWhite: #ededed;
  --maxWidth: 1000px;
  --tr: all 0.3s linear;
  --bs: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
   box-sizing: border-box;
  font-size: 10px;
   
  }
  *, *:before, *:after{
      box-sizing: inherit;
  }
  body{
      font-family: 'Tajawal-Regular' , --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding:0;
      margin: 0;
      font-size: 1.5rem;
      line-height:2;
      direction:rtl;
  }
  a{
      text-decoration: none;
      
  
  }
  
  button{
      font-family: 'Tajawal-Regular' --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  p,h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding:0;
  }
  .ant-modal-header{
    background-color:var(--slide);
  }
  .ant-modal-title,
  .ant-modal-close-x{
    color:white;
  }
  
 
   .ant-modal-header{
     text-align:center;
   }
   .ant-table-cell{
    text-align-last: right;
   }
   .ant-layout-header {
    padding: 0 15px;
   }
   
   .ant-empty{
    text-align-last: center ;
   }

 
.ant-popover-buttons {
    text-align: center;
  }
  .ant-pagination{
    direction: initial;
  }
  .ant-dropdown-menu {
    direction: ltr;
  }
  .mt-2{
    margin-top: 20px;
  }
  
  `;

const Container: React.FC = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Meta />
      {children}
    </div>
  );
};

export default Container;
