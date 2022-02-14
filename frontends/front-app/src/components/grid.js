import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import _ from "lodash";
import socketIOClient from "socket.io-client";
import DynamicComponent from "./DynamicComponent";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class AddRemoveLayout extends React.PureComponent {

  static defaultProps = {
    className: "layout",
    cols: {lg: 20, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 50,
    onLayoutChange: function() {},
    autoSize: true,

  };

  constructor(props) {
    super(props);

    this.state = {
      items: [
        
      ]
    };
    this.isDragging = false;
    this.isResizing = false;
    this.addItem = this.addItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    let port = process.env.REACT_APP_WEBSOCKET_PORT || 3010
    let host = process.env.REACT_APP_WEBSOCKET_HOST || window.location.hostname
    this.socket = socketIOClient(`http://${host}:${port}`);
  }

  componentDidMount() {
    this.socket.emit("refresh",null);

    this.socket.on("render", data => {
      if(this.state.items.find(item => {return item.id === data.id})===undefined)
      this.addItem(data.id, data.html);
    });
  return () => this.socket.disconnect();  }


  onItemClick = (e, c) => {
      // idiomatic way to prevent a click when resizing
      if (!this.isDragging && !this.isResizing){
        e.target.click()
            
      }       
  }
  onDrag = (e) => {
      this.isDragging = true;
  }
  onDragStop = (e) => {
      // HACK: add some delay otherwise a click event is sent
      setTimeout((obj) => { obj.isDragging = false }, 200, this)
  }
  onResizeStart = (e) => {
      this.isResizing = true;
  }
  onResizeStop = (e) => {
      // HACK: add some delay otherwise a click event is sent
      setTimeout((obj) => { obj.isResizing = false }, 200, this)
  } 
  
  
  createElement(item) {
      var props = {htmlContent: item.html,key: item.id}
      return (

        <div key={item.id} data-grid={item.layout} onTouchStart={((e) => {this.onItemClick(e, item.layout.i);})} onClick={((e) => {this.onItemClick(e, item.layout.i);})}>

              <span className="react-grid-dragHandleExample"></span>

          <div className="css-root" style={{width: '100%', height: '100%'}}>
            {React.createElement(DynamicComponent,props)}
            <span
              className="remove"
              onClick={this.onRemoveItem.bind(this, item.id)}
            >
              <i className="fa fa-close fa-3x"></i></span>


          </div>
        </div>
      );
    }

  addItem(id, html) {
    /*eslint no-console: 0*/
    const p = this.props;

    let lenght =this.state.items.length;
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat(
        {
          id: id,
          layout: {
            x: (this.state.items.length * 10) % 20,
            y: lenght===0?0:this.state.items[lenght-1].layout.y+(8*((this.state.items.length-1)%2)), // puts it at the bottom
            w: 10,
            h: 8,
            draggableHandle: ".react-grid-dragHandleExample"

          },
          html: html
        }),
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(id) {
    console.log("removing", id);
    this.setState({items: _.reject(this.state.items, {id: id})});
  }


  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}

          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onResizeStart={this.onResizeStart}
          onResizeStop={this.onResizeStop}
        >
          {_.map(this.state.items, item => this.createElement(item))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
