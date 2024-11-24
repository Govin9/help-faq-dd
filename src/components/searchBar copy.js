"use client"

import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
    const [faqs, setFaqs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Fetch FAQs from faqs.json
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/faqs.json');
            const data = await response.json();
            setFaqs(data);
        };
        fetchData();
    }, []);

    // Initialize Fuse.js for searching
    const fuse = new Fuse(faqs, {
        keys: ['question', 'answer'], // Specify the keys to search in
        includeScore: true,
        threshold: 0.3, // Adjust as needed
        // location: 0,
        // distance: 100,
    });

    // Handle input change
    function handleChange(value) {
        setSearchQuery(value);
    }

    // Effect to filter results based on search query
    useEffect(() => {
        if (searchQuery) {
            const results = fuse.search(searchQuery);
            setFilteredResults(results.map(result => result.item));
            setHasSearched(true);
        } else {
            setFilteredResults([]);
            setHasSearched(false);
        }
    }, [searchQuery, faqs]); // Add faqs as a dependency

    return (
        <div>
            <div className="flex items-center space-x-2 p-2">
                <Input
                    type="text"
                    placeholder="Search FAQs..."
                    onChange={(e) => handleChange(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </div>
            <div>
                {/* Display all FAQs if no search has been performed */}
                {!hasSearched && faqs.length > 0 && (
                    faqs.map((item, index) => (
                        <div key={index} className="p-4 border-b bg-white shadow-sm rounded-lg text-left"> {/* Added text-left class */}
                            <p className="text-lg font-semibold text-gray-800">
                                {item.question}
                            </p>
                            <p className="mt-2 text-gray-600">
                                {item.answer}
                            </p>
                        </div>
                    ))
                )}
                {/* Display search results */}
                {hasSearched && filteredResults.length > 0 && (
                    filteredResults.map((item, index) => (
                        <div key={index} className="p-4 border-b bg-white shadow-sm rounded-lg text-left"> {/* Added text-left class */}
                            <p className="text-lg font-semibold text-gray-800">
                                {item.question}
                            </p>
                            <p className="mt-2 text-gray-600">
                                {item.answer}
                            </p>
                        </div>
                    ))
                )}
                {/* No results found message */}
                {hasSearched && filteredResults.length === 0 && (
                    <p className="p-4 text-lg font-semibold text-gray-800">No results found.</p>
                )}
            </div>
        </div>
    );
}