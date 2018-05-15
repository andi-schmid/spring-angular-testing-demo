package org.addressbook.facade;

import org.addressbook.domain.Person;
import org.addressbook.domain.PersonDomainService;
import org.addressbook.dto.PersonDTO;
import org.addressbook.dto.PersonSearchResultElementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/rest/persons")
public class PersonService {

    private final PersonDomainService personDomainService;

    @Autowired
    public PersonService(PersonDomainService personDomainService) {
        this.personDomainService = personDomainService;
    }

    @GetMapping("/{id}")
    public PersonDTO findByPersonId(@PathVariable("id") int id) {

        Person person = personDomainService.findByPersonId(id);
        return new PersonDTO(person.getId(), person.getVersion(), person.getFirstname(), person.getLastname(),
                person.getStreet(), person.getZip(), person.getCity(), person.getPhone());
    }

    @GetMapping()
    public List<PersonSearchResultElementDTO> findByName(
            @RequestParam(name = "firstname", required = false) String firstname,
            @RequestParam(name = "lastname", required = false) String lastname) {

        List<Person> persons = personDomainService.findAdressesByName(firstname, lastname);
        return convertPersonList(persons);
    }

    private List<PersonSearchResultElementDTO> convertPersonList(List<Person> personList) {

        return personList.stream()
                .map(person -> new PersonSearchResultElementDTO(person.getId(), person.getFirstname(),
                        person.getLastname(), person.getZip(), person.getCity()))
                .collect(toList());

    }
}
