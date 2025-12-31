import { useEffect } from 'react';
import { useChangeOption } from '@/store'
import Home from '@/components/Dashboard/Home'
import UserList from '@/components/Dashboard/UserList'
import BusinessOverview from '@/components/Dashboard/BusinessOverview'
import Analyticsdashboard from '@/components/Dashboard/Analyticsdashboard'
import Settings from '@/components/Dashboard/Settings'
import Paster from '@/components/Paster'
import ListSchema from '@/components/Dashboard/ListSchema'
import Load from '@/components/Load'
import { useAuth } from '@clerk/nextjs';


export default ({ user }: { user: any }) => {

    const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();
    const { has }: { has: any } = useAuth()

    useEffect(() => {
        handler(location.hash)
        // if (location.hash == "") {
        //     location.href = "/#36d0ca3bfe8d3596e9275c87b6ace9e67f1dd077"
        // }
        window.onhashchange = () => {
            handler(location.hash)
        }
    }, [data]);


    return (
        <div className="mt-[72px] pb-8">
            {
                has({ permission: 'org:testpermission:soysuperadmin' }) ? 
                
                data == "" ?
                    <>
                        <ListSchema></ListSchema>
                    </>
                    : data == "#36d0ca3bfe8d3596e9275c87b6ace9e67f1dd077" ?
                        <>
                            {/* <Home></Home> */}
                            {/* <Paster></Paster> */}
                            {/* <Load></Load> */}
                        </>

                        : data == "#a90a81a258e5ab81db32d3a05b349b9f6df4e207" ?
                            <>
                                <UserList></UserList>
                            </>
                            : data == "#56acaf1d4b8590cbfac2aaafec411795f31c5bab" ?
                                <>
                                    <BusinessOverview></BusinessOverview>
                                </>
                                : data == "#cd2f1a458488e011a2fc1719ebe20437c52dc3e5" ?
                                    <>
                                        <Analyticsdashboard></Analyticsdashboard>
                                    </>

                                    : data == "#3cc1d5a427a45820b04fe30f78a972b784952460" ?
                                        <>
                                            <Settings></Settings>
                                        </>
                                        : <></>
                
                : <></> 

            }
        </div>


    );
}