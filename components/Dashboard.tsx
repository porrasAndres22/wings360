import { useEffect } from 'react';
import { useChangeOption } from '@/store'
import Home from '@/components/Dashboard/Home'
import UserList from '@/components/Dashboard/UserList'
import BusinessOverview from '@/components/Dashboard/BusinessOverview'
import Analyticsdashboard from '@/components/Dashboard/Analyticsdashboard'
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


                data == "" ?
                    <>
                        {
                            !localStorage.getItem("appSchema") ?
                                <ListSchema permission={permission} />
                                :
                                <Home></Home>
                        }

                    </>
                    : data == "#a90a81a258e5ab81db32d3a05b349b9f6df4e207" ?
                        <>
                            {permission.superAdmin || permission.admin ?
                                <UserList></UserList>
                                : <></>}
                        </>
                        : data == "#56acaf1d4b8590cbfac2aaafec411795f31c5bab" ?
                            <>
                                {permission.superAdmin || permission.admin ?
                                    <BusinessOverview></BusinessOverview>
                                    : <></>}
                            </>
                            : data == "#cd2f1a458488e011a2fc1719ebe20437c52dc3e5" ?
                                <>
                                    {permission.superAdmin || permission.admin ?
                                        <Analyticsdashboard></Analyticsdashboard>
                                        : <></>}
                                </>

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