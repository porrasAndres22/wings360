import { useEffect } from 'react';
import { useChangeOption } from '@/store'
import Home from '@/components/Dashboard/Home'
import Settings from '@/components/Dashboard/Settings'


export default ({ user }: { user: any }) => {

    const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();

    useEffect(() => {
        handler(location.hash)
        if (location.hash == "") {
            location.href = "/#36d0ca3bfe8d3596e9275c87b6ace9e67f1dd077"
        }
        window.onhashchange = () => {
            handler(location.hash)
        }
    }, [data]);


    return (
        data == "" ?
            <>
            </>
            : data == "#36d0ca3bfe8d3596e9275c87b6ace9e67f1dd077" ?
                <>
                    <Home></Home>
                </>

                : data == "#b6aa6ab9f34e8f9cfbd19358d156cd4884f07a75" ?
                    <>

                    </>

                    : data == "#3cc1d5a427a45820b04fe30f78a972b784952460" ?
                        <>
                            <Settings></Settings>
                        </>
                        : <></>


    );
}