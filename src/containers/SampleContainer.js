import React, { useEffect }  from "react";
import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers, GET_POST, GET_USERS } from "../modules/sample";

const SampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers
}) => {
    useEffect(()=>{

        const fn = async () => {
            try {
                await getPost(1);
                await getUsers();                
            } catch (error) {
                console.log(error);
            }
        };

        fn();

        /*
        getPost(1);
        getUsers();
        */
    }, [getPost, getUsers]);

    return (
        <Sample 
            post={post}
            users={users}
            loadingPost={loadingPost}
            loadingUsers={loadingUsers}
        />
    );
};

// with redux-thunk
export default connect(
    ({sample, loading}) => ({
        post: sample.post,
        users: sample.users,
        loadingPost: loading[GET_POST],
        loadingUsers: loading[GET_USERS]
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer);

/*
export default connect(
    ({sample}) => ({
        post: sample.post,
        users: sample.users,
        loadingPost: sample.loading.GET_POST,
        loadingUsers: sample.loading.GET_USERS
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer);
*/

