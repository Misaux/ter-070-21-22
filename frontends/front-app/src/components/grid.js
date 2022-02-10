import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import _ from "lodash";
import socketIOClient from "socket.io-client";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          layout: {
            i: 0,
            x: 0,
            y: 0,
            w: 1,
            h: 1,
          },
          html: "<p> Start sending content for it to be shown here.</p>"
        }
      ]
    };

    this.addItem = this.addItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.socket = socketIOClient(`http://${window.location.hostname}:3010`);
  }

  createElement(item) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    return (
      <div key={item.layout.i} data-grid={item.layout}>
        <div dangerouslySetInnerHTML={{__html: item.html}} />
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, item.layout.i)}
        >
          x
        </span>
      </div>
    );
  }

  addItem(id, html) {
    /*eslint no-console: 0*/
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat(
        {
          layout: {
            i: id,
            x: (this.state.items.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2
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


  onRemoveItem(id) {
    console.log("removing", id);
    this.setState({items: _.reject(this.state.items, {i: id})});
  }

  WebSocket() {
      //console.log("ici")
      this.socket.on("render", data => {
        this.addItem(data.id, data.html);
        console.log(data);
      });
    this.socket.emit("refresh",null);
    return () => this.socket.disconnect();
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