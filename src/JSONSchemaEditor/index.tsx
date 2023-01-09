import React, {useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";
import {useColorMode} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';

import type { JSONSchema7 } from "json-schema";
import type { Monaco } from "@monaco-editor/react"

type EditorProperties = {
    loadSchema: () => Promise<JSONSchema7>;
    defaultValue?: any
};

function JSONSchemaEditor(props : EditorProperties) : JSX.Element {
    const [schema, setSchema] = useState(undefined as unknown);
    const [fetchError, setFetchError] = useState(undefined as undefined | Error);
    const {colorMode} = useColorMode();

    useEffect(() => {
        props
            .loadSchema()
            .then( (userSchema) => setSchema(userSchema) )
            .catch( (err) =>  setFetchError(err))
    }, []);

    function handleEditorWillMount(monaco : Monaco) {
        // here is the monaco instance
        // do something before editor is mounted
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [
                {
                    uri: ( (schema as JSONSchema7)["$id"]) || "https://docusaurus.io/json-viewer/schema.json",
                    schema: schema
                }
            ]
        });
    }

    return (
        <Layout>
            { 
                (fetchError !== undefined) && <div>
                    <p>
                        <Translate values={{errorMessage: fetchError.message, id: "docusaurus-json-viewer-plugin.error"}}>
                            {'This component crashed because of error: {firstName}.'}
                        </Translate>
                    </p>
                </div>
            }
            {
                (schema === undefined) && <div>
                    <p>
                        <Translate values={{id: "docusaurus-json-viewer-plugin.loading"}}>
                            {'Loading schema ...'}
                        </Translate>
                    </p>
                </div>
            }
            {
                (schema !== undefined) && <Editor 
                    height="90vh"
                    defaultLanguage='json'
                    defaultValue={props.defaultValue}
                    beforeMount={handleEditorWillMount}
                    theme={ (colorMode === 'dark') ? "vs-dark" : "light" }
                />
            }
        </Layout>
    );
}

export default JSONSchemaEditor;