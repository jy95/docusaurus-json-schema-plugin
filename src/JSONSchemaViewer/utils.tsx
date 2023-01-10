import React from "react";

import type { JSONSchema7 } from "json-schema";

// To keep the same type everywhere here
type cleanSchema = Omit<JSONSchema7, "allOf">;

