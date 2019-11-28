import React, { Component } from 'react';

function TableRow ({product}) {
    return (
        <tr>
            <td>
                {product.name}
            </td>
            <td>
                {product.category}
            </td>
            <td>
                {product.description}
            </td>
            <td>
                {product.quantity}
            </td>
            <td>
                {product.cost}
            </td>
            <td>
                {product.price}
            </td>
            <td>
                <button className="btn btn-primary">Edit</button>
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    )
};

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {business: []};
    }
    componentDidMount(){
        axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({ business: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow(){
        return this.state.business.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }
    render() {
        return (
            <div>
                <h3 align="center">Products List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Selling Price</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.tabRow() }
                    </tbody>
                </table>
            </div>
        );
    }
}