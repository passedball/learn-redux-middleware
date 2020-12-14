import { connect } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter";
import Counter from "../components/Counter";

// with redux-thunk
const CounterContainer = ({ number, increaseAsync, decreaseAsync}) => {
    return (
        <Counter 
            number={number}
            onIncrease={increaseAsync}
            onDecrease={decreaseAsync}
        />
    );
};

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increaseAsync,
        decreaseAsync
    }
)(CounterContainer);

/*
// with redux-actions
const CounterContainer = ({ number, increase, decrease}) => {
    return (
        <Counter 
            number={number}
            onIncrease={increase}
            onDecrease={decrease}
        />
    );
};

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increase,
        decrease
    }
)(CounterContainer);
*/
