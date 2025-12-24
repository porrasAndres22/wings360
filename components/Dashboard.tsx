import { useChangeOption } from '@/store'
import ListSchema from './Dashboard/ListSchema';
import ReferInfo from './Dashboard/ReferInfo';
import CreateSchema from './Dashboard/CreateSchema';
import HeaderOptions from './Dashboard/HeaderOptions';
import { useEffect } from 'react';


export default ({ user }: { user: any }) => {

    const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();


    useEffect(() => {
        handler(location.hash)
        window.onhashchange = () => {
            handler(location.hash)
        }
    }, [data]);


    return (
        <div className="max-w-800px mx-auto px-4 lg:px-6">
            {data == "" ?
                <>
                    <HeaderOptions user={user}></HeaderOptions>
                    <ReferInfo></ReferInfo>
                    <ListSchema></ListSchema>
                </>
                : data == "#CreateSchema" ?
                    <>
                        <HeaderOptions user={user}></HeaderOptions>
                        <CreateSchema></CreateSchema>
                    </>

                    : data == "#ListUser" ?
                        <>Usuarios</>
                        : <></>}
        </div>
    );
}