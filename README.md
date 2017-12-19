# React Scrollx
React Scrolls is a react component that provides a custom, smooth, and cross-browser scroll.

## Motivation
The main idea of React Scrollx is the possibility of creating a cross-browser and customized scroll bar, which can be adapted to most layouts.

## Installation
```sh
npm install -D react-scrollx
```
## Usage
This minimal instructions will allow you to insert any type of your content like React components, jsx or raw text.

```html
//ES6
import ReactScrollx from 'react-scrolls';
import 'react-scrollx/dist/react-scrollx.css';

```
```html
<ReactScrollx width={100} height={350}>
    <YourContent/>
</ReactScrollx>
```

## API Reference (options/callbacks)

#### height 
 - Prop type: Number;
 - isRequired: true;
 - Set the height for your scroll container, takes a value in pixels;

#### width
 - Prop type: Number | String; 
 - isRequired: true;
 - Set the width for your scroll container. Can take a value in both pixels and in percentage. In case of percents value must be a String;
```html
<ReactScrollx height={400} width="60%"> //here example of percentage width
```
#### scrollBarClassName
 - Prop type: String; 
 - isRequired: false;
 - Set a custom CSS class for scroll bar;
 
 #### scrollThumbClassName
 - Prop type: String; 
 - isRequired: false;
 - Set a custom CSS class for scroll thumb;
 
 #### scrollContainerClassName
 - Prop type: String; 
 - isRequired: false;
 - Set a custom CSS class for scroll container;
 
 #### appearOnHover
 - Prop type: Boolean; 
 - isRequired: false;
 - By default the scroll is always visible, but setting this option to true 
    will remove the scroll bar and will only show by mouse hover on scroll container;r;
 
 #### scrollBarVisible
 - Prop type: Boolean; 
 - isRequired: false;
 - Set visible status of scroll bar;
 
 ### Callbacks
 
 #### onTopPosition
 - fire up when scroll thumb come his topmost position;
 
 #### onBottomPosition
 - fire up when scroll thumb come his bottommost position;
 
 #### onScroll
 - fire up everytime when user scrolls;
 
 ## Author
 Bulavyk Serj
 
 ## License
 This project is licensed under the MIT License
