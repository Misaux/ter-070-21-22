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
    compactType: null



  };

  constructor(props) {
    super(props);

    this.state = {
      items: [
        
      ]
    };

    this.addItem = this.addItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.socket = socketIOClient(`http://${window.location.hostname}:3010`);
  }
  componentDidMount() {
    this.socket.emit("refresh",null);

    this.socket.on("render", data => {
      this.addItem(data.id, data.html);
      console.log(data);
    });
  return () => this.socket.disconnect();  }


  createElement(item) {
    var props = {htmlContent: item.html,key: item.id}
    return (

      <div key={item.id} data-grid={item.layout} >

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

    const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat(
        {
          id: id,
          layout: {
            x: (this.state.items.length * 10) % 20,
            y:  Math.floor(this.state.items.length  / 10) *y, // puts it at the bottom
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
    console.log("ici")
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

        >
          {_.map(this.state.items, item => this.createElement(item))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}