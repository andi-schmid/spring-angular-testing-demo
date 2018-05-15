package org.addressbook.domain;

import org.addressbook.infrastructure.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Service
public class PersonDomainService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonDomainService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person findByPersonId(int id) {

        return personRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public List<Person> findAdressesByName(String firstname, String lastname) {

        if (isBlank(lastname)) {
            return personRepository.findByFirstname(firstname);
        }
        if (isBlank(firstname)) {
            return personRepository.findByLastname(lastname);
        }
        return personRepository.findByFirstnameAndLastname(firstname, lastname);
    }
}
