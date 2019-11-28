import React, { useReducer } from 'react';
import * as api from "../../services/product";

// ACTIONS
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const TEXT_CHANGE = 'TEXT_CHANGE';
export const IMAGE_SELECTED = 'IMAGE_SELECTED';
export const RESET_FORM = 'RESET_FORM';


let initialState = {
    name: "",
    category: "",
    description: "",
    quantity: 0,
    cost: 0,
    price: 0,
    image: null,
}

// REDUCER
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_STATE: {
            return {...state, ...action.state};
        }

        case TEXT_CHANGE: {
            return {...state, [action.name]: action.text};
        }

        case IMAGE_SELECTED: {
            return {...state, [action.name]: action.image};
        }

        case RESET_FORM: {
            return {...state, ...initialState};
        }

        default:
            return state;
    }
};


export default function Create(props) {
    const [state, dispatch] = useReducer(formReducer, initialState);
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    const onChange = e => {
        dispatch({type: TEXT_CHANGE, name:e.target.name, value:e.target.value});
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        alert(`Ready to Submit`)

        try {
            let response = await api.addProduct(state);
            alert("Product Added!");

            dispatch({type: RESET_FORM});

        } catch (error) {
            alert("an error occurr")
            console.log(error);
        }
    }

    return (
        <div style={{marginTop: 10}}>
            <h3>Create New Product</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    className="form-control"
                    name={"name"}
                    value={state['name']}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <select value={state['category']}
                    className="form-control">
                    <option value="Ford">Ford</option>
                    <option value="Volvo" selected>Volvo</option>
                    <option value="Fiat">Fiat</option>
                </select>
            </div>

            <div className="form-group">
                <label>Description: </label>
                <input
                    type="text"
                    className="form-control"
                    value={state['description']}
                    onChange={onChange}
                />
            </div>


            <div className="form-group">
                <label>Quantity:</label>
                <input
                    type="number"
                    name={"quantity"}
                    value={state['quantity']}
                    className="form-control"
                    onChange={onChange}
                />
            </div>


            <div className="form-group">
                <label>Cost:</label>
                <input
                    type="number"
                    name={"cost"}
                    value={state['cost']}
                    className="form-control"
                    onChange={onChange}
                />
            </div>


            <div className="form-group">
                <label>Selling Price:</label>
                <input
                    type="number"
                    name={"price"}
                    value={state['price']}
                    className="form-control"
                    onChange={onChange}
                />
            </div>

            <div className="form-group">
                <input type="submit" value="Add Product" className="btn btn-primary"/>
            </div>
        </form>
        </div>
    );
}