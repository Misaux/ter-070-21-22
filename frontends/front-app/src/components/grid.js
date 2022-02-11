import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import _ from "lodash";
import socketIOClient from "socket.io-client";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
    autoSize: true

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
    this.WebSocket()
  }
  createElement(item) {
    return (

      <div key={item.id} data-grid={item.layout} >
      <Card  >
        <CardContent style={{width: '100%', height: '100%'}}>
          <div  style={{width: '100%', height: 'inherit'}} dangerouslySetInnerHTML={{__html: item.html}} />
          <span
            className="remove"
            onClick={this.onRemoveItem.bind(this, item.id)}
          >
            
            <i class="fa fa-close"></i>          </span>
        </CardContent>
      </Card>
      </div>
    );
  }

  addItem(id, html) {
    /*eslint no-console: 0*/
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat(
        {
          id: id,
          layout: {
            x: (this.state.items.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 10,
            h: 10,
            containerPadding:[0,0],
            margin:[0,0]
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

  WebSocket() {
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