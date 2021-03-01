import React, { Component } from "react";
import SHOP_DATA from "./SHOP_DATA";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

export class Shoppage extends Component {
  state = {
    collections: SHOP_DATA,
  };
  render() {
    return (
      <div>
        {this.state.collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview
            key={id}
            {...otherCollectionProps}
          ></CollectionPreview>
        ))}
      </div>
    );
  }
}

export default Shoppage;
