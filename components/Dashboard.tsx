import { useEffect } from 'react';
import { useChangeOption } from '@/store'
import Home from '@/components/Dashboard/Home'
import UserList from '@/components/Dashboard/UserList'
import AdminSchema from '@/components/Dashboard/AdminSchema'
import AdminConnection from '@/components/Dashboard/AdminConnection'
import Settings from '@/components/Dashboard/Settings'
import ListSchema from '@/components/Dashboard/ListSchema'


export default ({ user, permission }: { user: any, permission: { superAdmin: boolean, admin: boolean } }) => {

    const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();

    useEffect(() => {
        handler(location.hash)
        window.onhashchange = () => {
            handler(location.hash)
        }
    }, [data]);


    return (
        <div className="mt-[72px] pb-8">
            {
                data == "" || data == "#" ?
                    <>
                        {
                            !localStorage.getItem("appSchema") ?
                                <ListSchema permission={permission} />
                                :
                                <Home></Home>
                        }

                    </>
                    : data == "#a90a81a258e5ab81db32d3a05b349b9f6df4e207" ?
                        <div className="animate__animated animate__fadeIn">
                            {permission.superAdmin || permission.admin ?
                                <UserList></UserList>
                                : <></>}
                        </div>
                        : data == "#56acaf1d4b8590cbfac2aaafec411795f31c5bab" ?
                            <div className="animate__animated animate__fadeIn">
                                {permission.superAdmin || permission.admin ?
                                    <AdminSchema />
                                    : <></>}
                            </div>
                            : data == "#cd2f1a458488e011a2fc1719ebe20437c52dc3e5" ?
                                <div className="animate__animated animate__fadeIn">
                                    {permission.superAdmin || permission.admin ?
                                        <AdminConnection />
                                        : <></>}
                                </div>

                                : data == "#3cc1d5a427a45820b04fe30f78a972b784952460" ?
                                    <>
                                        {permission.superAdmin ?
                                            <Settings></Settings>
                                            : <></>}
                                    </>
                                    : <></>
            }
        </div>


    );
}