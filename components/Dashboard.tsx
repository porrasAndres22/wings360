import { useEffect } from 'react';
import { useChangeOption } from '@/store'
import Home from '@/components/Dashboard/Home'


export default ({ user }: { user: any }) => {

    const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();


    useEffect(() => {
        handler(location.hash)
        window.onhashchange = () => {
            handler(location.hash)
        }
    }, [data]);


    return (
        data == "" ?
            <>
                {/* <Aside></Aside> */}
                <Home></Home>
            </>
            : data == "#7cc7714c6789e85385afa3773e584a38a4b6ce77" ?
                <>

                </>

                : data == "#b6aa6ab9f34e8f9cfbd19358d156cd4884f07a75" ?
                    <>

                    </>

                    : data == "#2e73936b82174696f261a4bbb4ee8be5f1b41672" ?
                        <>
                        </>
                        : <></>


    );
}