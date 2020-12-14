import React from "react";


const Sample = ({ loadingPost, loadingUsers, post, users}) => {
    //console.log(loadingPost);
    //console.log(loadingUsers);
    return (
        <div>
            <section>
                <h1>posts</h1>
                {loadingPost && 'Loading ...'}
                {!loadingPost && post && (
                    <div>
                        <h3>{post.titlle}</h3>
                        <h3>{post.body}</h3>
                    </div>
                )}
            </section>
            <hr />
            <section>
                <h1>Users</h1>
                {loadingUsers && 'Loading ...'}
                {!loadingUsers && users && (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.username} ({user.email})
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Sample;